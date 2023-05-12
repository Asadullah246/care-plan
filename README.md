# React, TypeScript Starter project with Context API setup.

## Package installed

- Axios
- SASS
- React-router-dom-v6

### ESLINT configuration needs to update

date input :

 <tr>
            <td>
              <label htmlFor="effectiveDate">{requireDiv} Effective Date</label>
            </td>
            <td>
              <Input
                type="date"
                placeholder={new Date(edited?.effective_date || new Date()).toDateString()}
                onChange={handleChange}
                name="effective_date"
                id="effective_date"
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="expirationDate">{requireDiv} Expiration Date</label>
            </td>
            <td>
              <Input
                type="date"
                placeholder={new Date(edited?.expiration_date || new Date()).toDateString()}
                onChange={handleChange}
                name="expiration_date"
                id="expirationDate"
                required
              />
            </td>
          </tr>
