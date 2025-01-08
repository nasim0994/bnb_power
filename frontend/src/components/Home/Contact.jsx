export default function Contact() {
  return (
    <section className="py-10" id="contact-us">
      <div className="container">
        <h3 className="text-2xl sm:text-3xl font-semibold text-neutral text-center">
          <span className="primary_text">
            BNB POWER & ENGINEERING PROJECT DIVISION TEAM
          </span>
        </h3>

        {/* table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MD. Badrul Hasan</td>
                <td>MD/CEO</td>
                <td>
                  <p>badrul@bnb-bd.com</p>
                  <p>Phone: +88 01817-203030</p>
                </td>
              </tr>
              <tr>
                <td>MD. Azahar Uddin</td>
                <td>Chief Engineer</td>
                <td>
                  <p>azahar@bnb-bd.com</p>
                  <p>Phone: +88 01324-344348</p>
                </td>
              </tr>
              <tr>
                <td>MD. Ryhan Khan Bipul</td>
                <td>Project Director</td>
                <td>
                  <p>bipul@bnb-bd.com</p>
                  <p>Phone: +88 01717-143521</p>
                </td>
              </tr>
              <tr>
                <td>Md. Parves</td>
                <td>Project Manager (operations)</td>
                <td>
                  <p>parves@bnb-bd.com</p>
                  <p>Phone: +880 1819 - 045434</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-aut">
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan={2} className="text-center">
                  Singapore Office
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MR. PC CHUA</td>
                <td className="text-center">Phone: +65 9661 7921</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-aut">
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan={2} className="text-center">
                  MatarBari ,Cox’s Office
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mr. Hyder</td>
                <td className="text-center">Phone: +88 01837-282263</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
