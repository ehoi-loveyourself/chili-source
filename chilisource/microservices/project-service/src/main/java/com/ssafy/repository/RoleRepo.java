package com.ssafy.repository;

import com.ssafy.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long>, RoleCustomRepo{
}
