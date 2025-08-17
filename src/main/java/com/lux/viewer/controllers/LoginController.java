package com.lux.viewer.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lux.viewer.jpahibernate.Demo;
import com.lux.viewer.models.AppUser;
import com.lux.viewer.restmodels.AuthUserResponse;
import com.lux.viewer.security.AppUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.naming.AuthenticationException;
import java.security.Principal;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
public class LoginController {
    public static final AppUser USER_NOT_AUTH = new AppUser();

    // should be removed
    @Autowired
    private Demo demo;
    private final UserDetailsService userDetailsService;
    private final AuthenticationProvider authService;
    private SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    public LoginController(
            @Autowired UserDetailsService userDetailsService,
            @Autowired AuthenticationProvider authService
    ) {
       this.userDetailsService = userDetailsService;
       this.authService = authService;
//        ObjectNode node = JsonNodeFactory.instance.objectNode();
//        node.put("username", "");
    }

//    @GetMapping("/login")
//    public ModelAndView getIndex() {
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("index.html");
//        // should be removed
//        // demo.run();
//        return modelAndView;
//    }

    @PostMapping("/login")
    public AppUser doLogin(
            @RequestBody Map<String, String> requestBody, HttpServletRequest request, HttpServletResponse response )
            throws AuthenticationException {
//        ObjectNode node = JsonNodeFactory.instance.objectNode();
//        node.put("auth", true);
        String username = requestBody.get("username");
        if (username == null) throw new AuthenticationException("No username provided");
        String password = requestBody.get("password");
        if (password == null) throw new AuthenticationException("No password provided");
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
                username, password);
        Authentication authentication = authService.authenticate(token);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, request, response);
        AppUserDetails user = (AppUserDetails) userDetailsService.loadUserByUsername(authentication.getName());
        return user.getUser();
    }

//    @GetMapping("/home")
//    public ModelAndView getLogin() {
//        return getIndex();
//    }

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

//    @GetMapping("/")
//    public ModelAndView getMain() {
//        return getIndex();
//    }
}
