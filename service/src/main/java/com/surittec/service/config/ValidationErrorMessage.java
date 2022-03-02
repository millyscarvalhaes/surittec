package com.surittec.service.config;

public class ValidationErrorMessage {

    private String field;
    private String message;

    public ValidationErrorMessage() {
    }

    public ValidationErrorMessage(String field, String message) {
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
