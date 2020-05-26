package com.finalgo.application.dao;

import com.finalgo.application.entity.Project;
import org.hibernate.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectDao extends AbstractGenericDao<Project> {

    public ProjectDao() {
        super(Project.class);
    }


    public List<Project> findAllByOwnerUsername(String ownerUsername){
        Query query = getCurrentSession().createQuery("from Project p where p.ownerUsername = :ownerUsername");
        query.setParameter("ownerUsername", ownerUsername);
        return query.getResultList();
    }
}
