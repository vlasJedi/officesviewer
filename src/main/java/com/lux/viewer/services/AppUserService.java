package com.lux.viewer.services;

import com.lux.viewer.models.AppUser;
import com.lux.viewer.repositories.AppUserRepository;
import com.lux.viewer.security.AppUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// @Service designed to be stateless
@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository userRepository;

    @Autowired
    public AppUserService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // build template object to match against
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("id", "firstName", "secondName")
                .withMatcher("username", (genericPropertyMatcher) -> {
                    genericPropertyMatcher.stringMatcher(ExampleMatcher.StringMatcher.EXACT);
                });
        AppUser appUserToFind = new AppUser();
        appUserToFind.setUsername(username);
        // find by example
        Optional<AppUser> userOpt = userRepository.findOne(Example.of(appUserToFind, matcher));
        if (userOpt.isEmpty()) throw new UsernameNotFoundException("Username not found");
        return new AppUserDetails(userOpt.get());
    }
}
