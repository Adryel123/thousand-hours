import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Modal } from '../components/modal'
import api from '../services/api'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [hourPerSubject, setHourPerSubject] = useState({})
  const [studies, setStudies] = useState<study[]>([])
  const [totalHours, setTotalHours] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    api.get('study/12345678').then(res => {
      setHourPerSubject(res.data.hours_per_subject)
      setStudies(res.data.studies)
      setTotalHours(res.data.total)
    })
  }, [])


  async function handleDelete(id: number) {
    const res = await api.delete(`study/12345678/${id}`)
    setHourPerSubject(res.data.hours_per_subject)
    setStudies(res.data.studies)
    setTotalHours(res.data.total)
  }

  async function handleNewStudy(subject: string, quantity: number) {
    const res = await api.post('study/12345678', {
      'hour_quantity': quantity,
      subject
    })
    setHourPerSubject(res.data.hours_per_subject)
    setStudies(res.data.studies)
    setTotalHours(res.data.total)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.container}>

      <div className={styles.totalHours}>
        <strong>{totalHours}</strong>
        <h2>Horas <br /> Estudadas</h2>
      </div>

      <div className={styles.subjectHoursContainer}>
        {hourPerSubject && Object.entries(hourPerSubject).map((item) => (
          <div key={item[0]}>
            <p>{item[0]}</p>
            <strong>{item[1] as number}</strong>
          </div>
        ))}

      </div>

      <div className={styles.lastStudiesContainer}>
        <h3>Últimos estudos</h3>

        <div className={styles.lastStudies}>
          {studies.length ? studies.map((study) => (
            <div key={study.id}>
              <strong>+{study.hour_quantity}</strong>
              <span>{study.subject}<br />{study.date}</span>
              <button
                onClick={() => handleDelete(study.id)}
              >
                x
              </button>
            </div>
          )) :
            (
              <p>Não há estudos recentes. Que tal adicionar alguns?</p>
            )
          }
        </div>

      </div>

      <button
        className={styles.addStudy}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      {isModalOpen &&
        <Modal
          closeModal={closeModal}
          onSubmit={handleNewStudy}
        />
      }
    </div>
  )
}


interface study {
  date: string
  hour_quantity: number
  id: number
  subject: string
}

export default Home
