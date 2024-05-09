import { IPublicationForm } from "../types/publication";

export function getCutterCode(publication:IPublicationForm): string{
    /*
    - Obra original com autor ->  A123t
    - Obra original sem autor -> T123
    - Obra traduzida com todas as informações (título original, título traduzido, autor, tradutor, idioma) -> 
    - Obra traduzida com ...
    - Obra traduzida com ...
    - Obra traduzida com ...
    - Obra traduzida com ...
    */

    return 'cutter Code:'+publication.title.toLowerCase().replace(' ', '+')
}