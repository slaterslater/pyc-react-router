export default function Grid({ columns, children }: { columns: number, children: React.ReactNode }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {children}
    </div>
  );
}