import styles from './Loader.module.css';
export default function Preloader() {
    return (
        <>
            <div className={styles.loaderContainer}>
                <div className={styles.loader}>
                    <div className={styles.loaderImage}></div>
                    <div className={styles.loaderBorder}></div>
                </div>
            </div>
        </>
    )
}
