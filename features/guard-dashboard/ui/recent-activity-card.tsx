type ActivityItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
};

export function RecentActivityCard({ items }: { items: ActivityItem[] }) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div>
        <p className="text-sm font-medium text-[#6D28D9]">Actividad reciente</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
          Bitácora operativa
        </h3>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6D28D9]" />
              {index < items.length - 1 ? (
                <div className="mt-2 h-full w-px bg-[#e9e9f0]" />
              ) : null}
            </div>

            <div className="flex-1 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium text-[#1f1f24]">{item.title}</p>
                <span className="text-xs text-[#8a8a95]">{item.time}</span>
              </div>

              <p className="mt-2 text-sm leading-6 text-[#666670]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}