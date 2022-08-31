import PropTypes from 'prop-types';

import styles from './CertificateName.module.scss';

function CertificateName({ id, subjectName, active, isActive, visible }) {
  const onActive = () => {
    isActive(id);
  };
  return (
    <div
      className={`${styles.item} 
        ${active ? styles.active : ''} 
        ${visible ? styles.cursor : ''}
      `}
      onClick={onActive}
    >
      <p> {subjectName}</p>
      <span>{active ? '➡️' : ''}</span>
    </div>
  );
}

export default CertificateName;

CertificateName.propTypes = {
  subjectName: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
