import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import DigitizationCenter from '../models/digitization-center.model';
import User from '../models/user.model';
import {
  DigitizationCenterCreateDto,
  DigitizationCenterUpdateDto,
} from '../dto/digitization-center.dto';

@Injectable()
export default class DigitizationCenterService {
  /**
   * Create Digitization Center + User
   */
  async create(data: DigitizationCenterCreateDto) {
    return DigitizationCenter.sequelize.transaction(async (transaction) => {
      // 1️⃣ Check duplicate center code
      const existingCenter = await DigitizationCenter.findOne({
        where: { code: data.code },
        transaction,
      });

      if (existingCenter) {
        throw new ConflictException(
          'Digitization center code already exists',
        );
      }

      // 2️⃣ Check duplicate username
      const existingUser = await User.findOne({
        where: { username: data.username },
        transaction,
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // 3️⃣ Create User (password generated internally)
      const hashedPassword = await bcrypt.hash('Temp@123', 10);

      const user = await User.create(
        {
          full_name: data.manager_name,
          username: data.username,
          password: hashedPassword,
          user_type_id: null,
        },
        { transaction },
      );

      // 4️⃣ Create Digitization Center
      const center = await DigitizationCenter.create(
        {
          user_id: user.user_id, // ✅ correct PK
          name: data.name,
          code: data.code,
          address: data.address,
          email: data.email,
          manager_name: data.manager_name,
          manager_contact: data.manager_contact,
        },
        { transaction },
      );

      return center;
    });
  }

  /**
   * Get all centers
   */
  async findAll() {
    return DigitizationCenter.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get center by ID
   */
  async findById(id: number) {
    const center = await DigitizationCenter.findByPk(id);

    if (!center) {
      throw new NotFoundException(
        `Digitization Center with ID ${id} not found`,
      );
    }

    return center;
  }

  /**
   * Update center
   */
  async update(id: number, data: DigitizationCenterUpdateDto) {
    const center = await this.findById(id);
    await center.update(data);
    return center;
  }

  /**
   * Soft delete center
   */
  async delete(id: number) {
    const center = await this.findById(id);
    await center.destroy(); // paranoid = true
    return { success: true, id };
  }
}
