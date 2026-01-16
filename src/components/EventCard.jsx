import { useEffect, useState } from "react";

export default function EventCard({ event }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!event.dateISO) return;

    const interval = setInterval(() => {
      const diff = new Date(event.dateISO) - new Date();
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event.dateISO]);

  return (
    <div className="enth-card">
      {/* TOP BANNER */}
      <div className="enth-banner">
        <h1>{event.bannerTitle}</h1>
        <span>{event.bannerSub}</span>
      </div>

      {/* BODY */}
      <div className="enth-body">
        <h2>{event.title}</h2>
        <p className="enth-date">{event.date}</p>

        <p className="enth-desc">{event.desc}</p>

        {/* COUNTDOWN */}
        {timeLeft && (
          <div className="enth-timer">
            {Object.entries(timeLeft).map(([k, v]) => (
              <div key={k}>
                <span>{v}</span>
                <small>{k.toUpperCase()}</small>
              </div>
            ))}
          </div>
        )}

        <button className="enth-btn">Register Now</button>
      </div>
    </div>
  );
}