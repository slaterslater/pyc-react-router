export function BlankHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-4 px-4 bg-charcoal text-white w-full h-[390px] md:h-[500px] rounded-md text-center">
        {children}
      </div>
    </div>
  );
}