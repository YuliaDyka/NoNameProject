import { Link } from "react-router-dom";
import "./styles/HomePage.css";

export default function HomePage() {
  return (
    <div className="home">
      {/* Header */}
      <div className="home__header">
        <h1>Моя бібліотека</h1>
        <p>Всі твої фільми, серіали та книги в одному місці</p>
      </div>

      {/* Sections */}
<div className="library-grid">
  <Link to="/movies" className="library-card">
    <div className="library-icon">🎬</div>
    <h3>Фільми</h3>
    <p>Облік переглянутих фільмів</p>
  </Link>

  <Link to="/series" className="library-card">
    <div className="library-icon">📺</div>
    <h3>Серіали</h3>
    <p>Сезони, серії, прогрес</p>
  </Link>

  <div className="library-card disabled">
    <div className="library-icon">📚</div>
    <h3>Книги</h3>
    <p>Скоро</p>
  </div>
</div>
<div className="continue">
  <h3>Продовжити перегляд</h3>

  <div className="continue__item">
    <div className="continue__info">
      <span className="continue__icon">📺</span>
      <div>
        <strong>Dark</strong>
        <div className="continue__meta">
          6 / 10 серій
        </div>
      </div>
    </div>

    <div className="continue__progress">
      <div
        className="continue__progress-bar"
        style={{ width: "60%" }}
      />
    </div>
  </div>
</div>


      {/* Quick actions */}
      <div className="home__actions">
        <button>➕ Додати фільм</button>
        <button>➕ Додати серіал</button>
      </div>

      {/* Recent activity */}
      <div className="recent-list">
        <h3>Останнє додане</h3>
        <ul>
          <li>🎬 Inception</li>
          <li>📺 Dark — сезон 1</li>
        </ul>
      </div>
    </div>
  );
}
