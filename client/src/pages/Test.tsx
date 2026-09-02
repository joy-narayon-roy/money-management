import { useState } from "react";
import Modal from "../modal/Modal";

export default function Test() {
    const [showModal, setShowModal] = useState(true)
    return (
        <>
            <div>Test</div>
            <Modal
                isOpen={showModal}
                onClose={() => { setShowModal(false)}}
                title="TEST"

            >
                <></>
            </Modal>
        </>
    )
}
