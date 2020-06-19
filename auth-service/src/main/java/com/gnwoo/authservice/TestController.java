package com.gnwoo.authservice;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.JWT;
import com.gnwoo.authservice.data.repo.AuthRepo;
import com.gnwoo.authservice.data.table.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
public class TestController {
    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Autowired
    private AuthRepo authRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // TODO: listen to RPC call from user service
    @GetMapping(path="/handle-signup")
    public @ResponseBody ResponseEntity<String> handleSignUp() {
        // bcrypt user-input password and save it into db
        Long uuid = Long.valueOf(123);
        String hashed_password = passwordEncoder.encode("123");
        authRepo.save(new Auth(uuid, hashed_password));

        // response OK
        return new ResponseEntity<>("signed up!", HttpStatus.OK);
    }

    // TODO: listen to RPC call from user service
    @PostMapping(path="/handle-login")
    public @ResponseBody ResponseEntity<String> handleLogin(@RequestParam Long uuid,
                                                            @RequestParam String user_input_password) {
        // get user's hashed_password from db
        List<String> relations = authRepo.findHashedPassword(uuid);

        // invalid login: username does not exist
        if(relations.isEmpty())
            return new ResponseEntity<>("user does not exit", HttpStatus.UNAUTHORIZED);

        // otherwise, username found
        String hashed_password = relations.get(0);

        // valid login: username and password combination matched
        if(passwordEncoder.matches(user_input_password, hashed_password))
        {
            // construct a JWT token
            String JWT_token;
            try
            {
                Algorithm algorithm = Algorithm.HMAC256("secret");
                JWT_token = JWT.create()
                               .withIssuer("gnw-auth-service")
                               .withClaim("uuid", uuid)
                               .withIssuedAt(new Date())
                               .sign(algorithm);
            }
            catch (JWTCreationException exception)
            {
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // response OK with JWT in the header
            String header_value = "JWT=" + JWT_token;
            HttpHeaders headers = new HttpHeaders();
            headers.add("Set-Cookie", header_value);
            return new ResponseEntity<>("login success", headers, HttpStatus.OK);
        }
        // otherwise, invalid login
        return new ResponseEntity<>("invalid password", HttpStatus.UNAUTHORIZED);
    }

    // TODO: listen to RPC call from communication service
    @PostMapping(path="/save-passcode")
    public @ResponseBody ResponseEntity<String> savePasscode() {
        // TODO: store (uuid, passcode) into Redis

        return new ResponseEntity<>("passcode saved", HttpStatus.OK);
    }

    // TODO: listen to RPC call from user service
    @PostMapping(path="/change-password")
    public @ResponseBody ResponseEntity<String> changePassword() {
        // TODO: check Redis if the user-input passcode matches

        // TODO: tell API Gateway to invalidate previous JWT

        return new ResponseEntity<>("password changed", HttpStatus.OK);
    }

    // TODO: listen to RPC call from user service
    @PostMapping(path="/single-logout")
    public @ResponseBody ResponseEntity<String> singleLogout() {
        return new ResponseEntity<>("single logout success", HttpStatus.OK);
    }

    // TODO: listen to RPC call from user service
    @PostMapping(path="/logout-everywhere")
    public @ResponseBody ResponseEntity<String> logoutEverywhere() {
        return new ResponseEntity<>("logout everywhere success", HttpStatus.OK);
    }

    // TODO: listen to RPC call from user service
    @PostMapping(path="/check-authorization")
    public @ResponseBody ResponseEntity<String> checkAuthorization() {
        // TODO: check if JWT has the level of power to perform the request

        return new ResponseEntity<>("request authorized!", HttpStatus.OK);
    }
}
