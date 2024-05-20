import { Textarea } from '../base'
import FormItem from './FormItem'

const TextareaInput = ({ inputProps = {}, ...props }) => (
  <FormItem {...props}>
    <Textarea {...inputProps} />
  </FormItem>
)

export default TextareaInput
