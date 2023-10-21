package com.lux.viewer.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lux.viewer.jpahibernate.Demo;
import com.lux.viewer.models.AppUser;
import com.lux.viewer.restmodels.AuthUserResponse;
import com.lux.viewer.security.AppUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.naming.AuthenticationException;
import java.security.Principal;

@RestController
public class LoginController {
    public static final AppUser USER_NOT_AUTH = new AppUser();

    // should be removed
    @Autowired
    private Demo demo;
    private final UserDetailsService userDetailsService;

    public LoginController(UserDetailsService userDetailsService) {
       this.userDetailsService = userDetailsService;
//        ObjectNode node = JsonNodeFactory.instance.objectNode();
//        node.put("username", "");
    }

    @GetMapping("/login")
    public ModelAndView getIndex() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index.html");
        // should be removed
        // demo.run();
        return modelAndView;
    }

    @PostMapping("/login")
    public AppUser doLogin(Authentication authentication) {
//        ObjectNode node = JsonNodeFactory.instance.objectNode();
//        node.put("auth", true);
        AppUserDetails user = (AppUserDetails) userDetailsService.loadUserByUsername(authentication.getName());
        return user.getUser();
    }

    @GetMapping("/home")
    public ModelAndView getLogin() {
        return getIndex();
    }

    @GetMapping("/user")
    public AppUser isAuthenticated(Principal auth) throws AuthenticationException {
        if (auth == null) {
            return USER_NOT_AUTH;
        }
        AppUserDetails user = (AppUserDetails) userDetailsService.loadUserByUsername(auth.getName());
        //ObjectNode node = JsonNodeFactory.instance.objectNode();
        //node.put("username", auth.getName());
//        return new AuthUserResponse(auth.getName());
        return user.getUser();
    }

    @GetMapping("/")
    public ModelAndView getMain() {
        return getIndex();
    }
}
