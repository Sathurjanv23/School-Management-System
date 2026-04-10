package com.sms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "marks")
public class Marks {

    @Id
    private String id;

    private String studentName;
    private String subject;
    private int marks;

    public Marks() {
    }

    public Marks(String id, String studentName, String subject, int marks) {
        this.id = id;
        this.studentName = studentName;
        this.subject = subject;
        this.marks = marks;
    }

    public String getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getSubject() {
        return subject;
    }

    public int getMarks() {
        return marks;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }
}