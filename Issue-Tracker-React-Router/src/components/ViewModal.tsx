interface ViewModalProps {
  title: string;
  description: string;
  onClose: () => void;
}

export default function ViewModal({
  title,
  description,
  onClose,
}: ViewModalProps) {
  return (
    <>
      <section className="fixed w-5/6 max-w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border dark:border-none shadow-md dark:bg-slate-800 px-6 py-8 rounded flex flex-col gap-y-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-gray-800 dark:text-gray-200">{description}</div>
        <button
          onClick={onClose}
          className="border px-4 py-2 rounded self-start"
        >
          Close
        </button>
      </section>
    </>
  );
}
