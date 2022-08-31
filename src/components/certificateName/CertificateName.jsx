import styles from './CertificateName.module.scss';

function CertificateName({ id, subjectName, active, isActive }) {
  const onActive = () => {
    isActive(id);
  };
  return (
    <div
      className={styles.item + ' ' + (active ? styles.active : '')}
      onClick={onActive}
    >
      <p> {subjectName}</p>
      <span>{active ? '➡️' : ''}</span>
    </div>
  );
}

export default CertificateName;
