'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Student, getStudents, deleteStudent, searchStudents } from '../api/studentApi';

export default function StudentList() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchStudents = async (page = 0) => {
    setLoading(true);
    try {
      const data = await getStudents(page);
      setStudents(data.students);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      fetchStudents(0);
      return;
    }

    setLoading(true);
    setIsSearching(true);
    try {
      const data = await searchStudents(searchTerm);
      setStudents(data.students);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要删除这条记录吗？')) {
      return;
    }

    try {
      await deleteStudent(id);
      // Refresh the current page
      if (isSearching) {
        handleSearch();
      } else {
        fetchStudents(currentPage);
      }
    } catch (err) {
      setError('Failed to delete student');
      console.error(err);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (isSearching) {
      searchStudents(searchTerm, newPage).then((data) => {
        setStudents(data.students);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      });
    } else {
      fetchStudents(newPage);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">学生管理系统</h1>
        <Link
          href="/students/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          添加学生
        </Link>
      </div>

      <div className="mb-6 flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索姓名、电话或邮箱..."
          className="flex-grow p-2 border rounded-l"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
        >
          搜索
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center p-8">Loading...</div>
      ) : students.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded">
          {isSearching ? '没有找到匹配的学生' : '暂无学生记录'}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">姓名</th>
                  <th className="py-2 px-4 border">性别</th>
                  <th className="py-2 px-4 border">电话</th>
                  <th className="py-2 px-4 border">专业</th>
                  <th className="py-2 px-4 border">邮箱</th>
                  <th className="py-2 px-4 border">操作</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border">{student.gender}</td>
                    <td className="py-2 px-4 border">{student.phone}</td>
                    <td className="py-2 px-4 border">{student.major}</td>
                    <td className="py-2 px-4 border">{student.email || '-'}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex space-x-2">
                        <Link
                          href={`/students/${student.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          查看
                        </Link>
                        <Link
                          href={`/students/${student.id}/edit`}
                          className="text-green-500 hover:underline"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => student.id && handleDelete(student.id)}
                          className="text-red-500 hover:underline"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  上一页
                </button>
                <span className="px-3 py-1">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  下一页
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
