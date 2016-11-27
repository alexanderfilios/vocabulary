package com.languages;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class VocabularyApplication {
	public static String RESOURCES_DIR = new StringBuilder()
	.append(System.getProperty("user.dir"))
			.append(File.pathSeparator)
			.append("vocabulary-backend")
			.append(File.pathSeparator)
			.append("src")
			.append(File.pathSeparator)
			.append("main")
			.append(File.pathSeparator)
			.append("resources")
			.append(File.pathSeparator)
			.toString();

	public static void main(String[] args) {
		SpringApplication.run(VocabularyApplication.class, args);
	}
}
