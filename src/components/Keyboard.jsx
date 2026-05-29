export default function Keyboard() {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
    return (
        <section className="keyboard-container">
            {alphabets.map((alpha) => <button key={alpha} className="key">{alpha.toLocaleUpperCase()}</button>)}

        </section>
    )
}