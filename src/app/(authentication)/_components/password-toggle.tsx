type PasswordToggleProps = {
  visible: boolean;
  onToggle: () => void;
};

export const PasswordToggle = ({ visible, onToggle }: PasswordToggleProps) => (
  <button
    aria-label={visible ? "Hide password" : "Show password"}
    aria-pressed={visible}
    className="rounded-md px-2 py-1.5 text-[13px] font-semibold text-teal-700 transition-colors hover:bg-teal-50 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
    onClick={onToggle}
    type="button"
  >
    {visible ? "Hide" : "Show"}
  </button>
);
