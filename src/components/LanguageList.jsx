import { languages } from '../assets/languages.js'

export default function LanguageList(props) {
    
    return (
        <section className="languages-container">
            
            {languages.map(lang => (
                <p style={{ backgroundColor: lang.backgroundColor, color: lang.color }} key={lang.name}>
                    {lang.name}
                </p>
            ))}

      </section>
    )
}