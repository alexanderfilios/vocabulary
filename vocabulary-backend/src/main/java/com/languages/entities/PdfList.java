package com.languages.entities;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.languages.VocabularyApplication;
import org.springframework.data.util.Pair;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Created by alexandrosfilios on 13/11/16.
 */
public class PdfList {
    private static final Font TITLE_FONT = new Font(
            Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLACK);
    private static final Font TERM_FONT = new Font(
            Font.FontFamily.HELVETICA, Font.DEFAULTSIZE, Font.BOLD, BaseColor.BLACK);
    private static final Font DEFINITION_FONT = new Font(
            Font.FontFamily.TIMES_ROMAN, Font.DEFAULTSIZE, Font.NORMAL, BaseColor.BLACK);
    private static final Font SYNONYM_FONT = new Font(
            Font.FontFamily.TIMES_ROMAN, Font.DEFAULTSIZE, Font.BOLD, new BaseColor(34, 139, 34));
    private static final Font ANTONYM_FONT = new Font(
            Font.FontFamily.TIMES_ROMAN, Font.DEFAULTSIZE, Font.BOLD, BaseColor.RED);
    private static final Font EXAMPLE_FONT = new Font(
            Font.FontFamily.TIMES_ROMAN, Font.DEFAULTSIZE, Font.ITALIC, BaseColor.BLACK);
    private static final Float FIRST_LINE_INDENT = 10f;
    private static final Float INDENT = 15f;
    private static final String TEMPORARY_FILENAME = "temp.pdf";

    private String filepath;
    private Document document;
    private String filename;

    public PdfList(String filename) {
        this.filepath = VocabularyApplication.RESOURCES_DIR + filename;
        this.filename = filename;
        this.document = new Document();
    }
    public String getFilepath() {
        return filepath;
    }
    public String getFilename() {
        return filename;
    }

    public static PdfList getListFromTerms(List<Term> terms) {
        PdfList pdfList = new PdfList(TEMPORARY_FILENAME);
        try (FileOutputStream fileOutputStream = new FileOutputStream(pdfList.filepath)) {
            PdfWriter.getInstance(pdfList.document, fileOutputStream);
            pdfList.document.open();
            // Setup document
            pdfList.document.addTitle("Title");
            pdfList.document.addCreationDate();
            pdfList.document.setPageCount(1);
            pdfList.document.setMargins(30, 30, 40, 40);

            // Add text
            pdfList.document.add(getDocumentHeader("Vocabulary"));
            pdfList.document.add(getEmptyLines(2));
            if (terms != null && terms.size() > 0) {
                pdfList.document.add(getTermList(terms));
            } else {
                pdfList.document.add(noTermsFound());
            }
            pdfList.document.newPage();
            pdfList.document.close();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }
        return pdfList;
    }
    private static Paragraph noTermsFound() {
        return new Paragraph("No terms found!");
    }

    private static Paragraph getTermList(List<Term> terms) {
        return terms.stream()
                .map(term -> getTerm(term))
                .reduce(new Paragraph(), (accumulator, term) -> {
                    accumulator.add(term);
                    accumulator.add(getEmptyLines(1));
                    return accumulator;
                });
    }

    private static Paragraph getDocumentHeader(String header) {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(TITLE_FONT);
        paragraph.setAlignment(Element.ALIGN_CENTER);
        paragraph.add(header);
        return paragraph;
    }

    public static Paragraph getTerm(Term term) {

        Paragraph termParagraph = new Paragraph();
        termParagraph.setFirstLineIndent(FIRST_LINE_INDENT);
        termParagraph.setIndentationLeft(INDENT);
        termParagraph.setAlignment(Element.ALIGN_JUSTIFIED);
        termParagraph.setFont(TERM_FONT);
        termParagraph.add(term.getTerm() + ": ");

        return term.getDefinitions().stream()
                .reduce(Pair.of(1, termParagraph),
                        (accumulator, definition) -> {
                            Paragraph definitionParagraph = accumulator.getSecond();
                            Integer index = accumulator.getFirst();
                            String synonyms = definition.getSynonyms().stream()
                                    .map(Synonym::getSynonym)
                                    .collect(Collectors.joining(", "));
                            String antonyms = definition.getAntonyms().stream()
                                    .map(Antonym::getAntonym)
                                    .collect(Collectors.joining(", "));
                            String examples = definition.getExamples().stream()
                                    .map(Example::getExample)
                                    .collect(Collectors.joining(" "));

                            definitionParagraph.setFont(DEFINITION_FONT);
                            definitionParagraph.add(index + ". " + definition.getDefinition() + " ");
                            definitionParagraph.setFont(SYNONYM_FONT);
                            definitionParagraph.add(synonyms + " ");
                            definitionParagraph.setFont(ANTONYM_FONT);
                            definitionParagraph.add(antonyms + " ");
                            definitionParagraph.setFont(EXAMPLE_FONT);
                            definitionParagraph.add(examples);
                            return Pair.of(index + 1, definitionParagraph);
                        },
                        (acc1, acc2) -> {
                            acc1.getSecond().add(acc2.getSecond());
                            return Pair.of(acc1.getFirst() + acc2.getFirst(), acc1.getSecond());
                        }).getSecond();
    }

    private static Paragraph getEmptyLines(Integer number) {
        return IntStream.rangeClosed(0, number - 1).boxed()
                .map((idx) -> new Paragraph())
                .reduce(new Paragraph(), (accumulator, current) -> {
                    accumulator.add(current);
                    return accumulator;
                });
    }
}
