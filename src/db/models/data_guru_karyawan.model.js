module.exports = (sequelize, DataTypes) => {
    const dataGuruKaryawan = sequelize.define(
        'data_guru_karyawan',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tahun_masuk: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        no_hp:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_role:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_role:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        file_name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        file_path:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        upload_date:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        jabatan:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        mata_pelajaran:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        tableName: 'data_guru_karyawan'
    }
    );
    return dataGuruKaryawan;
}