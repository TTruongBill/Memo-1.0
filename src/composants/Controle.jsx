import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import * as tacheModele from '../code/tache-modele';
import { useState } from 'react';

export default function Controle({etatTaches, utilisateur}) {  
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  const [tri, setTri] = useState(['date', true]);



  function afficherTouteTaches() {
    tacheModele.lireTout(uid, tri).then(
      taches => setTaches([ ...taches])
    );
    
  }
  
  function afficherTacheCompletee() {
    tacheModele.lireTout(uid, tri).then(
      taches => setTaches(taches.filter(
        tache => tache.completee == true
      ))
    );
  }
  function afficherTacheNonComplet() {
    tacheModele.lireTout(uid, tri).then(
      taches => setTaches(taches.filter(
        tache => tache.completee == false
      ))
    );
  }

  function supprimerTacheCompletee(){
    tacheModele.supprimerCompleter(uid).then(
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
        <ToggleButton value={'toutes'} onClick={afficherTouteTaches}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={afficherTacheCompletee}>Complétées</ToggleButton>
        <ToggleButton value={false} onClick={afficherTacheNonComplet}>Actives</ToggleButton>
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