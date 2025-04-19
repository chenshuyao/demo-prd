'use client';

import { useParams } from 'next/navigation';
import StudentForm from '../../../components/StudentForm';

export default function EditStudentPage() {
  const params = useParams();
  const studentId = Number(params.id);

  return <StudentForm studentId={studentId} isEditMode={true} />;
}
