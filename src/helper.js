import ASN1 from '@lapo/asn1js';

const getTextValue = seq =>
  seq.sub?.[0] ? seq.sub[0].sub[1].content() : seq.content();

const getCertificateInfo = result => {
  const asn1 = ASN1.decode(result);
  const certificateInfo = asn1.sub[0];

  const subjectInfo = certificateInfo.sub[5];
  const issuerInfo = certificateInfo.sub[3];
  const validityInfo = certificateInfo.sub[4];

  const subjectCN = getTextValue(subjectInfo.sub[3]);
  const issuerCN = getTextValue(issuerInfo.sub[2]);
  const validFrom = getTextValue(validityInfo.sub[0]);
  const validTill = getTextValue(validityInfo.sub[1]);

  return { subjectCN, issuerCN, validFrom, validTill };
};

export { getCertificateInfo };
