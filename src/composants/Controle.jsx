import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import * as tacheModele from '../code/tache-modele';

export default function Controle({etatTaches, utilisateur}) {  
  const [taches, setTaches] = etatTaches;

  
  function supprimerTacheCompletee(){
    tacheModele.supprimerCompleter(utilisateur.uid).then(
      // On filtre le tableau des tâches localement et on met à jour l'état React "taches"
      () => setTaches(taches.filter(
        tache => tache.completee == ""
      ))
    );
  }

  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'}>Toutes</ToggleButton>
        <ToggleButton value={true}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        ?? tâches actives
      </span>
      <IconButton 
        aria-label="Supprimer toutes les tâches complétées"
        color="error" 
        onClick={supprimerTacheCompletee} 
        title="Supprimer toutes les tâches complétées"
      >
        <DeleteIcon/>
      </IconButton>
    </footer>
  );
}