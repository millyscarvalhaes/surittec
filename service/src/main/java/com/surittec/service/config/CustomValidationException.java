package com.surittec.service.config;

public class CustomValidationException  extends RuntimeException{

    private static final long serialVersionUID = 1L;

    private String entity;
    private String message;

    public CustomValidationException() { }

    public CustomValidationException(String entity, String message) {
        this.entity = entity;
        this.message = message;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
