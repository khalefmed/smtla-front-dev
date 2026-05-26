import { api } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react'; 

export const MotDePasse = () => {
    const { t } = useTranslation();

    const [ancien, setAncien] = useState("");
    const [nouveau, setNouveau] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [loading, setLoading] = useState(false); 

    const modifier = async (e) => {
        e.preventDefault();
        
        
        if (!ancien || !nouveau || !confirmation) {
            toast.error(t('Veuillez remplir tous les champs'));
            return;
        }

        if (nouveau !== confirmation) {
            toast.error(t('Les nouveaux mots de passe ne correspondent pas'));
            return;
        }

        try {
            setLoading(true); 
            const response = await api.put(
                `modifier-mot-de-passe/`,
                {
                    "ancien": ancien,
                    "nouveau": nouveau,
                }
            );

            
            toast.success(t('Mot de passe modifié avec succès !'));
            
            
            setAncien("");
            setNouveau("");
            setConfirmation("");

            
            

        } catch (exception) {
            console.log(exception);
            if (exception.response && exception.response.status === 400) {
                
                const errorMsg = exception.response.data?.detail || t('Ancien mot de passe incorrect');
                toast.error(errorMsg);
            } else {
                toast.error(t("Une erreur s'est produite lors de la modification"));
            }
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className='p-10 mx-10 flex flex-col gap-8 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl text-blackColor font-bold'>{t('Modifier le mot de passe')}</h1>
                <p className='text-lg max-sm:text-sm text-textGreyColor font-medium '>
                    {t('Veuillez remplir les champs suivant pour modifier votre mot de passe')}
                </p>
            </div>
            
            <form onSubmit={modifier} className='w-[400px] max-sm:w-full flex flex-col gap-8 '>
                <div>
                    <input 
                        type="password" 
                        value={ancien} 
                        onChange={(e) => setAncien(e.target.value)} 
                        placeholder={t("Entrez l'ancien mot de passe")} 
                        className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-textGreyColor font-medium border border-transparent focus:border-buttonGradientSecondary" 
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={nouveau} 
                        onChange={(e) => setNouveau(e.target.value)} 
                        placeholder={t("Entrez le nouveau mot de passe")} 
                        className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-textGreyColor font-medium border border-transparent focus:border-buttonGradientSecondary" 
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={confirmation} 
                        onChange={(e) => setConfirmation(e.target.value)} 
                        placeholder={t("Confirmez le nouveau mot de passe")} 
                        className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-textGreyColor font-medium border border-transparent focus:border-buttonGradientSecondary" 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full rounded-lg flex justify-center items-center py-2 mt-2 bg-buttonGradientSecondary text-whiteColor font-medium cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>{t("Chargement...")}</span>
                        </div>
                    ) : (
                        t("Modifier le mot de passe")
                    )}
                </button>
            </form>
        </div>
    )
}