'use client';

import { useParams } from 'next/navigation';
import StudentDetail from '../../components/StudentDetail';

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = Number(params.id);

  return <StudentDetail studentId={studentId} />;
}
