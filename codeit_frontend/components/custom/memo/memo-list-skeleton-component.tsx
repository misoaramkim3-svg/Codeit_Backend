const MemoListSkeletonComponent = () => {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">메모를 불러오는 중이에요</span>
      <div className="py-4">
        <div className="skeleton h-4 w-24" />
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="entry">
          <div className="entry-date gap-2">
            <div className="skeleton h-8 w-8" />
            <div className="skeleton h-3 w-8" />
          </div>
          <div className="entry-content flex flex-col gap-2">
            <div className="skeleton h-6 w-2/3" />
            <div className="skeleton mt-1 h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
            <div className="skeleton mt-2 h-3 w-24" />
          </div>
          <div className="entry-thumb skeleton" />
        </div>
      ))}
    </div>
  );
};

export default MemoListSkeletonComponent;
