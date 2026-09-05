import Modal, { type ModalProps } from "./Modal";

interface Props extends ModalProps {
  index?: number
}
export default function TransactionTemplateModal(props: Props) {
  const {
    title = "Tansaction Template",
    ...otherProps } = props
  return (
    <Modal
      title={title}
      {...otherProps}
    >
      Transactions
    </Modal>)
}
