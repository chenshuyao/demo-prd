package com.chenshuyao.demo.repository;

import com.chenshuyao.demo.model.Student;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Student entity.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

  /**
   * Find all non-deleted students.
   *
   * @param pageable pagination information
   * @return page of students
   */
  Page<Student> findByIsDelete(Integer isDelete, Pageable pageable);

  /**
   * Find students by name containing the given keyword and not deleted.
   *
   * @param name     name keyword
   * @param isDelete deletion status
   * @param pageable pagination information
   * @return page of students
   */
  Page<Student> findByNameContainingAndIsDelete(String name, Integer isDelete, Pageable pageable);

  /**
   * Find students by phone containing the given keyword and not deleted.
   *
   * @param phone    phone keyword
   * @param isDelete deletion status
   * @param pageable pagination information
   * @return page of students
   */
  Page<Student> findByPhoneContainingAndIsDelete(String phone, Integer isDelete, Pageable pageable);

  /**
   * Search students by keyword in name, phone, or email.
   *
   * @param keyword  search keyword
   * @param isDelete deletion status
   * @param pageable pagination information
   * @return page of students
   */
  @Query("SELECT s FROM Student s WHERE (s.name LIKE %:keyword% OR s.phone LIKE %:keyword% OR s.email LIKE %:keyword%) AND s.isDelete = :isDelete")
  Page<Student> searchByKeyword(@Param("keyword") String keyword, @Param("isDelete") Integer isDelete, Pageable pageable);
}
