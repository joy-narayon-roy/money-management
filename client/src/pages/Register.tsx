
export default function Register() {
    return (
        <form>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <div>
                <label>Name</label>
                <input type="text" name="name" />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" maxLength={10} name="email" />
            </div>
            <button>Submit</button>
        </form>
    )
}
