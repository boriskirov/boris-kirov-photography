import { useEffect, useState } from "react";

const STORAGE_KEY = "os-theme";
const CHOICES = ["system", "light", "dark"];

function readChoice() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (CHOICES.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  return "system";
}

function applyTheme(choice) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = choice === "dark" || (choice === "system" && systemDark);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

function SystemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <rect
        x="32"
        y="48"
        width="192"
        height="144"
        rx="16"
        transform="translate(256 240) rotate(180)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="160"
        y1="224"
        x2="96"
        y2="224"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <line x1="240" y1="160" x2="16" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="208" y1="200" x2="48" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <path d="M66,160a64,64,0,1,1,124,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="80" y1="40" x2="88" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="24" y1="96" x2="40" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="232" y1="96" x2="216" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="176" y1="40" x2="168" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    </svg>
  );
}

function DarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <line x1="208" y1="120" x2="208" y2="72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="232" y1="96" x2="184" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="160" y1="32" x2="160" y2="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <line x1="176" y1="48" x2="144" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <path d="M210.69,158.18A96.78,96.78,0,0,1,192,160,96.08,96.08,0,0,1,97.82,45.31,88,88,0,1,0,210.69,158.18Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    </svg>
  );
}

const ICONS = {
  system: SystemIcon,
  light: LightIcon,
  dark: DarkIcon,
};

export default function OsThemeSwitch() {
  const [choice, setChoice] = useState("system");

  useEffect(() => {
    setChoice(readChoice());
  }, []);

  useEffect(() => {
    applyTheme(choice);
    if (choice !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [choice]);

  const select = (value) => {
    setChoice(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  };

  return (
    <fieldset className="os-theme">
      <legend className="os-sr">Select a display theme:</legend>
      {CHOICES.map((value) => {
        const Icon = ICONS[value];
        return (
          <span key={value} className="os-theme-option">
            <input
              type="radio"
              name="os-theme"
              value={value}
              aria-label={value}
              checked={choice === value}
              onChange={() => select(value)}
            />
            <label>
              <span className="os-sr">{value}</span>
              <Icon />
            </label>
          </span>
        );
      })}
    </fieldset>
  );
}
