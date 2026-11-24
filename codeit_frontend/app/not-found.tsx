import Link from "next/link";

const NotFound = () => {
  return (
    <main className="page flex-1">
      <div className="status">
        <h1 className="status-title">페이지를 찾을 수 없어요</h1>
        <p className="status-desc">주소가 바르게 입력되었는지 확인해 주세요.</p>
        <Link href="/" className="btn-secondary mt-10">
          처음으로
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
