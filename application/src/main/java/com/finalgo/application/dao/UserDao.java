package com.finalgo.application.dao;

import com.finalgo.application.entity.User;
import org.hibernate.query.Query;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;

@Service
public class UserDao extends AbstractGenericDao<User> {

    public UserDao() {
        super(User.class);
    }

    /**
     * Récupèrer l'utilisateur correspondant aux paramètres suivant:
     * @param username
     * @param password
     * @return User
     *
     * TODO Implémenter la requête Hibernate/SQL
     */
    public User findWithCredentials(String username, String password) {
        User user = findByField("username", username);
        if(user != null && user.getPassword().equals(password)){
            return user;
        } else {
            return null;
        }
    }
}
