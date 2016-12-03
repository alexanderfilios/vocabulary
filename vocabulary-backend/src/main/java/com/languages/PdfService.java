package com.languages;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.languages.entities.*;
import org.springframework.data.util.Pair;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Created by alexandrosfilios on 13/11/16.
 */
@Service
public class PdfService {
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
    private static final Float INDENT = 25f;

    private static final DateFormatter dateFormatter = new DateFormatter("dd.MM.YYYY");

    public PdfService() {}

    public String getListFromTerms(String filename, List<Term> terms) {
        Document document = new Document();
        String filepath = VocabularyApplication.RESOURCES_DIR + filename;

        try (FileOutputStream fileOutputStream = new FileOutputStream(filepath)) {
            PdfWriter.getInstance(document, fileOutputStream);
            document.open();
            // Setup document
            document.addTitle("Word List per " + dateFormatter.print(new Date(), Locale.getDefault()));
            document.addCreationDate();
            document.setPageCount(1);
            document.setMargins(60, 60, 40, 40);

            // Add text
            document.add(getDocumentHeader("Vocabulary"));
            document.add(getEmptyLines(2));
            if (terms != null && terms.size() > 0) {
                document.add(getTermList(terms));
            } else {
                document.add(noTermsFound());
            }
            document.newPage();
            document.close();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }
        return filepath;
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

    private static Paragraph getTerm(Term term) {

        Paragraph termParagraph = new Paragraph();
        termParagraph.setFirstLineIndent(FIRST_LINE_INDENT);
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
                            definitionParagraph.add(" " + index + ". " + definition.getDefinition() + " ");
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
