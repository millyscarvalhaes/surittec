package com.surittec.service.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@ControllerAdvice
public class ControllerExceptionHandler  {

    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<?> validationException(ConstraintViolationException exception){

        List<ValidationErrorMessage> errorMessageList = new ArrayList<>();
        for(ConstraintViolation<?> constraint: exception.getConstraintViolations()){
            errorMessageList.add( new ValidationErrorMessage(constraint.getPropertyPath().toString(), constraint.getMessage()) );
        }

        return new ResponseEntity<>(errorMessageList, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<?> methodArgumentException(MethodArgumentNotValidException exception){

        List<ValidationErrorMessage> errorMessageList = new ArrayList<>();
        for(ObjectError error: exception.getAllErrors()){
            errorMessageList.add( new ValidationErrorMessage(error.getObjectName().toString(), error.getDefaultMessage()) );
        }

        return new ResponseEntity<>(errorMessageList, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {CustomValidationException.class})
    public ResponseEntity<?> customValidationException(CustomValidationException exception){
        return new ResponseEntity<>(new ValidationErrorMessage(exception.getEntity(),exception.getMessage()), HttpStatus.BAD_REQUEST);
    }

}
