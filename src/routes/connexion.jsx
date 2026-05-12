import { useState } from "react";
import Logo from "../assets/logo.png";
import Person from "../assets/icons/person.svg";
import Password from "../assets/icons/password.svg";
import Eye from "../assets/icons/eye.svg";
import EyeSlashed from "../assets/icons/eye_slashed.svg";
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";
import Spinner from "@/components/ui/shared/spinner";

function Connexion() {
  const { t } = useTranslation();
  const [nom_utilisateur, setNomUtilisateur] = useState();
  const [mot_de_passe, setMotDePasse] = useState();
  const [en_cours, setEnCours] = useState(false);
  const [show, setShow] = useState(false);

  const connexion = async (e) => {
    e.preventDefault();
    try {
      setEnCours(true);
      const response = await api.post("connexion/", {
        username: nom_utilisateur,
        mot_de_passe: mot_de_passe,
      });
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("prenom", response.data.utilisateur.prenom);
      window.localStorage.setItem("nom", response.data.utilisateur.nom);
      window.localStorage.setItem("role", response.data.utilisateur.type_display);
      window.localStorage.setItem("telephone", response.data.utilisateur.telephone);
      window.localStorage.setItem("groupes", response.data.groupes);
      window.localStorage.setItem("groupes_info", JSON.stringify(response.data.utilisateur.groupes_info));
      window.location = "/";
    } catch (exception) {
      setEnCours(false);
      if (exception.response.status === 401) {
        toast.error(<p className="text-redColor">{t("Mot de passe Incorrecte")}</p>);
      } else if ((exception.response.status = 404)) {
        toast.error(<p className="text-redColor">{t("Vous n'êtes pas autorisés")}</p>);
      } else {
        toast.error(<p className="text-redColor">{t("Une erreur s'est produite")}</p>);
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .connexion-root {
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          background-color: #f0f2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Animated background orbs */
        .connexion-root::before,
        .connexion-root::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: float 8s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .connexion-root::before {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, var(--btn-secondary, #0C588D), transparent 70%);
          top: -120px;
          left: -120px;
        }
        .connexion-root::after {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--btn-primary, #0F75BC), transparent 70%);
          bottom: -100px;
          right: -80px;
          animation-delay: -4s;
        }

        @keyframes float {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(30px) scale(1.06); }
        }

        /* Card */
        .card {
          position: relative;
          z-index: 1;
          display: flex;
          width: 100%;
          max-width: 860px;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(59, 107, 220, 0.18), 0 4px 16px rgba(0,0,0,0.06);
          animation: slideUp 0.55s cubic-bezier(.22,.84,.44,1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Left panel */
        .panel-left {
          width: 52%;
          padding: 3rem 2.5rem;
          background: linear-gradient(145deg, var(--btn-secondary, #0C588D) 0%, var(--btn-primary, #0F75BC) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .panel-left::before {
          content: '';
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.12);
          top: -80px;
          right: -80px;
        }
        .panel-left::after {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.1);
          bottom: 40px;
          left: -50px;
        }

        .panel-left-content {
          position: relative;
          z-index: 1;
        }

        .panel-left .badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 100px;
          background: rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.9);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 2rem;
          backdrop-filter: blur(8px);
        }

        .panel-left h1 {
          color: #fff;
          font-size: 2.1rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
        }

        .panel-left p {
          color: rgba(255,255,255,0.78);
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.7;
          max-width: 300px;
        }

        /* Decorative grid dots */
        .dot-grid {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          display: grid;
          grid-template-columns: repeat(5, 6px);
          gap: 7px;
          opacity: 0.25;
          z-index: 1;
        }
        .dot-grid span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
          display: block;
        }

        /* Right panel – form */
        .panel-right {
          width: 48%;
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .logo-wrap {
          animation: fadeIn 0.6s 0.2s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-header {
          text-align: center;
          animation: fadeIn 0.6s 0.3s both;
        }
        .form-header h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a2340;
          margin-bottom: 4px;
        }
        .form-header p {
          font-size: 0.8rem;
          font-weight: 300;
          color: #8d97b0;
        }

        /* Inputs */
        .fields {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          animation: fadeIn 0.6s 0.4s both;
        }

        .field-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #7a84a0;
          margin-bottom: 5px;
        }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f4f6fc;
          border: 1.5px solid #e8ecf8;
          border-radius: 12px;
          padding: 12px 16px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-wrap:focus-within {
          border-color: var(--btn-secondary, #0C588D);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(91, 141, 238, 0.12);
        }

        .input-wrap img {
          width: 17px;
          height: 17px;
          opacity: 0.45;
          flex-shrink: 0;
        }

        .input-wrap input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.875rem;
          font-family: inherit;
          color: #1a2340;
        }
        .input-wrap input::placeholder {
          color: #b0b8d0;
          font-weight: 300;
        }

        .eye-btn {
          cursor: pointer;
          padding: 2px;
          border-radius: 4px;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .eye-btn:hover { opacity: 0.7; }

        /* Submit button */
        .submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--btn-secondary, #0C588D) 0%, var(--btn-primary, #0F75BC) 100%);
          color: white;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 6px 24px rgba(59, 107, 220, 0.32);
          animation: fadeIn 0.6s 0.5s both;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(59, 107, 220, 0.4);
        }
        .submit-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 14px rgba(59, 107, 220, 0.3);
        }
        .submit-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          transform: none;
        }

        /* Footer */
        .dev-credit {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          opacity: 0.5;
          transition: opacity 0.3s;
          white-space: nowrap;
          z-index: 2;
        }
        .dev-credit:hover { opacity: 1; }
        .dev-credit span {
          font-size: 9.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8d97b0;
        }
        .dev-credit a {
          font-size: 12px;
          font-weight: 600;
          color: var(--btn-secondary, #0C588D);
          text-decoration: none;
          transition: color 0.2s;
        }
        .dev-credit a:hover { color: var(--btn-primary, #0F75BC); }

        /* Responsive */
        @media (max-width: 768px) {
          .panel-left { display: none; }
          .panel-right { width: 100%; padding: 3rem 2rem; }
        }
      `}</style>

      <div className="connexion-root">
        <div className="card">
          {/* ── Left decorative panel ── */}
          <div className="panel-left">
            <div className="panel-left-content">
              <span className="badge">{t("Portail Sécurisé")}</span>
              <h1>{t("Bienvenue")}</h1>
              <p>{t("Connexion text")}</p>
            </div>

            {/* Dot grid decoration */}
            <div className="dot-grid">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div className="panel-right">
            <div className="logo-wrap">
              <img src={Logo} width={130} alt="Logo" />
            </div>

            <div className="form-header">
              <h2>{t("Connexion")}</h2>
              <p>{t("Entrez vos identifiants pour continuer")}</p>
            </div>

            <form onSubmit={connexion} style={{ width: "100%" }}>
              <div className="fields">
                {/* Username */}
                <div>
                  <p className="field-label">{t("Identifiant")}</p>
                  <div className="input-wrap">
                    <img src={Person} alt="" />
                    <input
                      type="text"
                      value={nom_utilisateur}
                      onChange={(e) => setNomUtilisateur(e.target.value)}
                      placeholder={t("Votre identifiant")}
                      name="nom_utilisateur"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <p className="field-label">{t("Mot de passe")}</p>
                  <div className="input-wrap">
                    <img src={Password} alt="" />
                    <input
                      type={show ? "text" : "password"}
                      value={mot_de_passe}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      placeholder={t("Votre mot de passe")}
                      name="password"
                      required
                    />
                    <span className="eye-btn" onClick={() => setShow(!show)}>
                      <img src={show ? EyeSlashed : Eye} width={18} alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.75rem" }}>
                <button type="submit" className="submit-btn" disabled={en_cours}>
                  {en_cours && <Spinner color="white" />}
                  {t("Se connecter")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Developer credit */}
        <div className="dev-credit">
          <span>Développé par</span>
          <a href="https://www.infinity.mr" target="_blank" rel="noopener noreferrer">
            www.infinity.mr
          </a>
          <span>© 2026</span>
        </div>

        <Toaster />
      </div>
    </>
  );
}

export default Connexion;