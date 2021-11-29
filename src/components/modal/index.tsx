import { FormEvent, useState } from 'react'
import styles from './styles.module.scss'

export function Modal({ onSubmit, closeModal }: ModalProps) {
  const [subject, setSubject] = useState('')
  const [hours, setHours] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await onSubmit(subject, Number(hours))
    closeModal()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <strong>Novo Estudo</strong>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="description"
            >
              Matéria
            </label>
            <input
              type="text"
              id="materia"
              name="materia"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Matéria"
              required
            />
          </div>

          <div >
            <label
              htmlFor="horas"
            >
              Horas estudadas
            </label>
            <input
              type="number"
              id="horas"
              name="horas"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Horas estudadas"
              required
            />
          </div>

          <div className={styles.buttons}>
            <a href="#" onClick={closeModal} className={styles.cancel}>cancelar</a>
            <button
              type="submit"
              className={styles.save}
            >
              salvar
            </button>
          </div>

        </form>
      </div >
    </div >
  )
}

interface ModalProps {
  closeModal: () => void
  onSubmit: (subject: string, quantity: number) => void
}