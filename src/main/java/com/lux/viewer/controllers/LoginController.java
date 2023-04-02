package com.lux.viewer.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lux.viewer.jpahibernate.Demo;
import com.lux.viewer.restmodels.AuthUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.naming.AuthenticationException;
import java.security.Principal;

@RestController
public class LoginController {

    // should be removed
    @Autowired
    private Demo demo;

    @GetMapping("/login")
    public ModelAndView getIndex() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index.html");
        // should be removed
        // demo.run();
        return modelAndView;
    }

    @PostMapping("/login")
    public String doLogin() {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("auth", true);
        return node.toString();
    }

    @GetMapping("/home")
    public ModelAndView getLogin() {
        return getIndex();
    }

    @GetMapping("/user")
    public AuthUserResponse isAuthenticated(Principal auth) throws AuthenticationException {
        if (auth == null) {
            return new AuthUserResponse();
        }
        //AppUserDetails user = (AppUserDetails) userDetailsService.loadUserByUsername(auth.getName());
        //ObjectNode node = JsonNodeFactory.instance.objectNode();
        //node.put("username", auth.getName());
        return new AuthUserResponse(auth.getName());
    }

    @GetMapping("/")
    public ModelAndView getMain() {
        return getIndex();
    }
}
