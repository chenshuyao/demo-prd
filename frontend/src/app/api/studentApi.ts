/**
 * API client for student management
 */

const API_URL = 'http://localhost:8080/api';

export interface Student {
  id?: number;
  userId?: number;
  name: string;
  gender: string;
  phone: string;
  age: number;
  nativePlace?: string;
  major: string;
  email?: string;
  tag?: string;
  remark?: string;
  createTime?: string;
  modifyTime?: string;
  isDelete?: number;
  creator?: number;
}

export interface PageResponse<T> {
  students: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Get all students with pagination
 */
export const getStudents = async (
  page = 0,
  size = 10,
  sort = 'id',
  order = 'asc'
): Promise<PageResponse<Student>> => {
  const response = await fetch(
    `${API_URL}/students?page=${page}&size=${size}&sort=${sort}&order=${order}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
};

/**
 * Get student by ID
 */
export const getStudentById = async (id: number): Promise<Student> => {
  const response = await fetch(`${API_URL}/students/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  return response.json();
};

/**
 * Create a new student
 */
export const createStudent = async (student: Student): Promise<Student> => {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  return response.json();
};

/**
 * Update an existing student
 */
export const updateStudent = async (
  id: number,
  student: Student
): Promise<Student> => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return response.json();
};

/**
 * Delete a student
 */
export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
};

/**
 * Search students by keyword
 */
export const searchStudents = async (
  keyword: string,
  page = 0,
  size = 10
): Promise<PageResponse<Student>> => {
  const response = await fetch(
    `${API_URL}/students/search?keyword=${encodeURIComponent(
      keyword
    )}&page=${page}&size=${size}`
  );
  if (!response.ok) {
    throw new Error('Failed to search students');
  }
  return response.json();
};

/**
 * Search students by name
 */
export const searchStudentsByName = async (
  name: string,
  page = 0,
  size = 10
): Promise<PageResponse<Student>> => {
  const response = await fetch(
    `${API_URL}/students/search/name?name=${encodeURIComponent(
      name
    )}&page=${page}&size=${size}`
  );
  if (!response.ok) {
    throw new Error('Failed to search students by name');
  }
  return response.json();
};

/**
 * Search students by phone
 */
export const searchStudentsByPhone = async (
  phone: string,
  page = 0,
  size = 10
): Promise<PageResponse<Student>> => {
  const response = await fetch(
    `${API_URL}/students/search/phone?phone=${encodeURIComponent(
      phone
    )}&page=${page}&size=${size}`
  );
  if (!response.ok) {
    throw new Error('Failed to search students by phone');
  }
  return response.json();
};
