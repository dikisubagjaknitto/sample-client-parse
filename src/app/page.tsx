import styles from './page.module.css'
import LiveQueryComponents from '@/components/LiveQueryComponents'

export default function Home() {
  return (
    <main className={styles.main}>
     <LiveQueryComponents />
    </main>
  )
}
