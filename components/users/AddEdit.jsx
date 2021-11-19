import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string(),

        username: Yup.string()
            .required('Username is required'),
        ref: Yup.string(),
        bank: Yup.string(),
        acc: Yup.string(),
        rate: Yup.string(),
        tel: Yup.string(),
        line: Yup.string(),
        role: Yup.string(),
        din: Yup.string(),
        credit: Yup.string(),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(user.id, data);
    }

    function createUser(data) {
        return userService.register(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>ชื่อ - นามสกุล</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                {/* <div className="form-group col">
                    <label>Last Name</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div> */}
                <div className="form-group col">
                    <label>รหัสพันธมิตร</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>รหัสอ้างอิง</label>
                    <input name="ref" type="text" {...register('ref')} className={`form-control ${errors.ref ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                <div className="form-group col-3">
                    <label>ธนาคาร</label>
                    <input name="bank" type="text" {...register('bank')} className={`form-control ${errors.bank ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>เลขบัญชีธนาคาร</label>
                    <input name="acc" type="text" {...register('acc')} className={`form-control ${errors.acc ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-1">
                    <label>สู้ฟรี</label>
                    <input name="rate" type="text" {...register('rate')} className={`form-control ${errors.rate ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-3">
                    <label>Role</label>
                    <input name="role" type="text" {...register('role')} className={`form-control ${errors.role ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                
            </div>
            <div className="form-row">
                
                <div className="form-group col-3">
                    <label>หมายเลขโทรศัพท์</label>
                    <input name="tel" type="text" {...register('tel')} className={`form-control ${errors.tel ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>ID Line</label>
                    <input name="line" type="text" {...register('line')} className={`form-control ${errors.line ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>วันที่สร้างuser</label>
                    <input name="din" type="text" {...register('din')} className={`form-control ${errors.din ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>เครดิตร</label>
                    <input name="credit" type="text" {...register('credit')} className={`form-control ${errors.credit ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            
            <div className="form-row">
                <div className="form-group col">
                    <label>
                        Password (รหัสตั้งต้น 111111)
                        {!isAddMode && <em className="ml-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}