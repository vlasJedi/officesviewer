package com.lux.viewer.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@RestController
public class LoginController {
    @GetMapping("/login")
    public ModelAndView getIndex() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index.html");
        return modelAndView;
    }

    @GetMapping("/home")
    public ModelAndView getLogin() {
        return getIndex();
    }

    @GetMapping("/user")
    public String isAuthenticated(Principal auth) {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("username", auth.getName());
        return node.toString();
    }
}
