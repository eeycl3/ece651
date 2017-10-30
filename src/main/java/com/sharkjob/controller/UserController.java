package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.google.gson.Gson;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "/regUser", method = POST)
    public ResponseEntity<String> regUser(@RequestBody  String newUser)
                                        //UriComponentsBuilder builder)
    {
        Gson gson = new Gson();
        User user = gson.fromJson(newUser, User.class);

        if (user.getEmail().trim().length() > 0 && user.getUserName().trim().length() > 0 && user.getPassword().trim().length() > 0) {
            if (userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName()) != null) {
                return new ResponseEntity<>("This username has already exists",HttpStatus.CONFLICT);
            }
            if (userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail()) != null) {
                return new ResponseEntity<>("This email has already exists",HttpStatus.CONFLICT);
            }

            userDao.saveUserInSharkJobUserTable(user);

            //HttpHeaders header = new HttpHeaders();
            //header.setLocation(builder.path("/login").build().toUri());

            return new ResponseEntity<>(gson.toJson(user),HttpStatus.CREATED);

        } else {

            return new ResponseEntity<>("Input invalid",HttpStatus.NO_CONTENT);

        }

    }

    @RequestMapping(value = "/toLogin", method = POST)
    public ResponseEntity<String> loginUser(@RequestBody String emailorusername) {
                                          //UriComponentsBuilder builder) {

        log.info(emailorusername);
        Gson gson = new Gson();
        User user = gson.fromJson(emailorusername, User.class);
        User userInTable;

        if( user.getEmail()!=null ) {
            userInTable = userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail());
        }
        else {
            userInTable = userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName());
        }

        if(userInTable != null) {
            if (user.getPassword().equals(userInTable.getPassword())) {
                //HttpHeaders header = new HttpHeaders();
                //header.setLocation(builder.path("/index?username={username}").buildAndExpand(user.getUserName()).toUri());

                return new ResponseEntity<>(gson.toJson(userInTable),HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Wrong password",HttpStatus.UNAUTHORIZED);
            }
        }

        return new ResponseEntity<>("No username or email",HttpStatus.UNAUTHORIZED);

    }


    @RequestMapping(value = "/updateSkills", method = POST)
    public boolean updateSkills(@RequestParam String email,
                                @RequestParam List<String> skills) {

        return userDao.updateSkillsInSharkJobUserTableThroughEmail(email, skills);
    }

    //find exception->update
    //@RequestMapping(value = "/changeEmail", method = POST)
    //@RequestMapping(value = "/changeUserName", method = POST)
    //@RequestMapping(value = "/changePassword", method = POST)


    @RequestMapping(value="/getUser",method = GET)
    public User getUserInfo(@RequestParam String email) {
        //check if return is null
        return userDao.findUserInSharkJobUserTableThroughEmail(email);
    }
}

